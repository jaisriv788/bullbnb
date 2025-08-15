import { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import abi from "../../mainAbi.json";
import { Rank } from "../../data/data";
import green from "../../assets/treeCardIcons/green.jpg";
import gold from "../../assets/treeCardIcons/gold.jpg";
import blue from "../../assets/treeCardIcons/blue.jpg";
import blank from "../../assets/treeCardIcons/blank.jpg";

const rankOptions = [
  "",
  "Starter",
  "Executive",
  "Achiever",
  "Pioneer",
  "Director",
  "Star",
  "Champion",
  "Mentor",
  "Titan",
  "Platinum",
  "Diamond",
  "Icon",
  "Legend",
  "Ambassador",
  "President",
];
const colors = ["bg-[#014713]", "bg-[#01004E]", "bg-[#C58000]", "bg-[#565656]"];
const txtColors = [
  "text-[#014713]",
  "text-[#01004E]",
  "text-[#C58000]",
  "text-[#565656]",
];

const renderCardNode = ({ nodeDatum }, onClick) => {
  const pkg = Number(nodeDatum.package);
  let clr, txt, img;

  if (pkg >= 1 && pkg <= 5) {
    clr = colors[0];
    txt = txtColors[0];
    img = green;
  } else if (pkg >= 6 && pkg <= 10) {
    clr = colors[1];
    txt = txtColors[1];
    img = blue;
  } else if (pkg >= 11 && pkg <= 15) {
    clr = colors[2];
    txt = txtColors[2];
    img = gold;
  } else {
    clr = colors[3];
    txt = txtColors[3];
    img = blank;
  }

  return (
    <foreignObject width={100} height={120} x={-50} y={-30}>
      <div
        onClick={() => {
          if (nodeDatum.name !== "-") onClick(nodeDatum); // prevent modal on placeholders
        }}
        className="box-border overflow-hidden w-[94px] sm:w-[100px] h-[94px] bg-white border border-gray-600 rounded-lg shadow-sm flex flex-col items-center justify-between pt-1 cursor-pointer"
      >
        <img
          src={img}
          alt="MLM"
          className="h-12 rounded-full border border-[#09182C] "
        />
        <span className={`text-sm ${txt}`}>{nodeDatum.name}</span>
        <div className={`${clr} w-full text-center text-white text-xs`}>
          {Rank[pkg - 1] ?? "-"}
        </div>
      </div>
    </foreignObject>
  );
};

// helper: always return two children, filling with placeholders
const ensureTwoChildren = (children) => {
  const filled = [...children];
  while (filled.length < 2) {
    filled.push({
      name: "-",
      package: 0,
      address: "-",
      referrer: "-",
      team: 0,
      upline: "",
      children: [],
    });
  }
  return filled;
};

const FixedMLMTree = ({
  topId,
  setTopId,
  onParentUpdate,
  debouncedInputId,
}) => {
  const [showModel, setShowModel] = useState(false);
  const [modelData, setModelData] = useState(null);
  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const contractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  const dispatch = useDispatch();

  async function fetchInputSearch() {
    if (debouncedInputId.length === 0) return;

    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
      const contract = new web3.eth.Contract(abi, contractAddress);

      let level = 1;
      const batchSize = 30;
      let found = false;

      while (!found) {
        const batchLevels = Array.from(
          { length: batchSize },
          (_, i) => level + i
        );

        const batchPromises = batchLevels.map((currentLevel) =>
          contract.methods
            .getLevelWiseUsers(walletAddress, currentLevel)
            .call()
            .then((data) => ({ level: currentLevel, data }))
        );

        const batchResults = await Promise.all(batchPromises);

        for (const result of batchResults) {
          result.data.forEach((item) => {
            if (item["user"].id.toString() === debouncedInputId) {
              found = true;
              setTopId(item["user"].account);
              return;
            }
          });

          if (found) break;
        }

        if (!found) {
          level += batchSize;
        }
      }
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      dispatch(screenLoaderVisibilty(false));
    }
  }

  useEffect(() => {
    fetchInputSearch();
  }, [debouncedInputId]);

  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [nodeSize, setNodeSize] = useState({ x: 150, y: 130 });
  const [separation, setSeparation] = useState({
    siblings: 1.3,
    nonSiblings: 1.5,
  });
  const [treeData, setTreeData] = useState(null);

  const updateTreeLayout = () => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 50 });

      if (width < 500) {
        setNodeSize({ x: 100, y: 120 });
        setSeparation({ siblings: 1.1, nonSiblings: 1.2 });
      } else if (width < 768) {
        setNodeSize({ x: 120, y: 130 });
        setSeparation({ siblings: 1.3, nonSiblings: 1.4 });
      } else {
        setNodeSize({ x: 150, y: 130 });
        setSeparation({ siblings: 1.4, nonSiblings: 1.5 });
      }
    }
  };

  useEffect(() => {
    updateTreeLayout();
    window.addEventListener("resize", updateTreeLayout);
    return () => window.removeEventListener("resize", updateTreeLayout);
  }, []);

  const handleCardClick = () => {
    setTopId(modelData.address.toLowerCase());
    setShowModel(false);
  };

  const openModel = (data) => {
    setShowModel(true);
    setModelData(data);
  };

  async function fetchTreeData() {
    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
      const contract = new web3.eth.Contract(abi, contractAddress);

      const referer = await contract.methods.users(topId).call();

      if (walletAddress.toLowerCase() !== referer.account.toLowerCase()) {
        onParentUpdate(referer?.upline);
      }

      const [refererChild, refererGrandChild] = await Promise.all([
        contract.methods.getMatrixUsers(topId, 0).call(),
        contract.methods.getMatrixUsers(topId, 1).call(),
      ]);

      const addressesToFetch = [
        referer?.referrer,
        refererChild?.[0]?.referrer,
        refererChild?.[1]?.referrer,
        ...refererGrandChild.map((gc) => gc?.referrer),
      ];

      const [
        topReferer,
        firstChildReferer,
        secondChildReferer,
        ...grandchildReferers
      ] = await Promise.all(
        addressesToFetch.map((addr) =>
          addr ? contract.methods.users(addr).call() : {}
        )
      );

      const getGrandChildrenFor = (parentAddress) =>
        refererGrandChild
          .map((gc, idx) => ({
            ...gc,
            refererData: grandchildReferers[idx] || {},
          }))
          .filter(
            (gc) => gc?.upline?.toLowerCase() === parentAddress?.toLowerCase()
          );

      const topNode = {
        name: referer?.id ?? "-",
        package: Number(referer?.currentPackage ?? 0),
        address: referer?.account ?? "-",
        referrer: topReferer?.id ?? "-",
        team: referer?.totalMatrixTeam ?? 0,
        upline: referer?.upline ?? "",
        children: ensureTwoChildren([
          {
            name: refererChild?.[0]?.id ?? "-",
            package: Number(refererChild?.[0]?.currentPackage ?? 0),
            address: refererChild?.[0]?.account ?? "-",
            referrer: firstChildReferer?.id ?? "-",
            team: refererChild?.[0]?.totalMatrixTeam ?? 0,
            upline: refererChild?.[0]?.upline ?? "",
            children: ensureTwoChildren(
              getGrandChildrenFor(refererChild?.[0]?.account).map((gc) => ({
                name: gc?.id ?? "-",
                package: Number(gc?.currentPackage ?? 0),
                address: gc?.account ?? "-",
                referrer: gc?.refererData?.id ?? "-",
                team: gc?.totalMatrixTeam ?? 0,
                upline: gc?.upline ?? "",
              }))
            ),
          },
          {
            name: refererChild?.[1]?.id ?? "-",
            package: Number(refererChild?.[1]?.currentPackage ?? 0),
            address: refererChild?.[1]?.account ?? "-",
            referrer: secondChildReferer?.id ?? "-",
            team: refererChild?.[1]?.totalMatrixTeam ?? 0,
            upline: refererChild?.[1]?.upline ?? "",
            children: ensureTwoChildren(
              getGrandChildrenFor(refererChild?.[1]?.account).map((gc) => ({
                name: gc?.id ?? "-",
                package: Number(gc?.currentPackage ?? 0),
                address: gc?.account ?? "-",
                referrer: gc?.refererData?.id ?? "-",
                team: gc?.totalMatrixTeam ?? 0,
                upline: gc?.upline ?? "",
              }))
            ),
          },
        ]),
      };

      setTreeData(topNode);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      dispatch(screenLoaderVisibilty(false));
    }
  }

  useEffect(() => {
    if (topId) fetchTreeData();
  }, [topId]);

  return (
    <div
      className="relative w-full h-110 flex flex-col items-center justify-center"
      ref={containerRef}
    >
      {showModel && (
        <div
          onClick={() => {
            setShowModel(false);
          }}
          className="absolute w-full bg-black/60 z-50 h-full flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-110 rounded-lg overflow-hidden"
          >
            <div className="text-center text-lg font-semibold py-2 bg-gradient-to-r to-[#F54913] from-[#DA8912]">
              ID: {modelData?.name}
            </div>
            <div className="bg-[#242424] p-3 flex flex-col gap-2">
              <div className="border-2 flex justify-between border-gray-400 bg-[#0F192F] rounded-full px-3">
                <div>Address</div>
                <div>
                  {modelData?.address.slice(0, 5) +
                    "..." +
                    modelData?.address.slice(-5)}
                </div>
              </div>
              <div className="border-2 flex justify-between border-gray-400 bg-[#0F192F] rounded-full px-3">
                <div>Rank</div>
                <div>{rankOptions[modelData?.package]}</div>
              </div>
              <div className="border-2 flex justify-between border-gray-400 bg-[#0F192F] rounded-full px-3">
                <div>Referred By</div>
                <div>{modelData.referrer}</div>
              </div>
              <div className="border-2 flex justify-between border-gray-400 bg-[#0F192F] rounded-full px-3">
                <div>Community Size</div>
                <div>{modelData?.team}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  onClick={handleCardClick}
                  className="cursor-pointer bg-gradient-to-r rounded-md p-2 to-[#F54913] from-[#DA8912]"
                >
                  View Downline
                </button>
                <button
                  onClick={() => {
                    setShowModel(false);
                  }}
                  className="cursor-pointer bg-white rounded-md p-2 text-black"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {treeData && (
        <Tree
          data={treeData}
          translate={translate}
          orientation="vertical"
          renderCustomNodeElement={(rd) => renderCardNode(rd, openModel)}
          collapsible={false}
          zoomable={false}
          draggable={true}
          pathFunc="elbow"
          nodeSize={nodeSize}
          separation={separation}
        />
      )}
    </div>
  );
};

export default FixedMLMTree;
