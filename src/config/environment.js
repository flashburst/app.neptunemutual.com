function getChainIdFromDNS() {
  // window.location.host - subdomain.domain.com
  const parts = window.location.host.split(".");

  switch (parts[0]) {
    case "mumbai":
      return "80001";
    case "kovan":
      return "42";
    case "bsctest":
      return "97";
    case "app":
      return "1";
    case "bsc":
      return "56";
    case "polygon":
      return "137";

    default:
      return "42";
  }
}

export const getNetworkId = () => parseInt(getChainIdFromDNS(), 10);
export const getGraphURL = (networkId) => {
  if (networkId === 3) {
    return "https://api.thegraph.com/subgraphs/name/neptune-mutual/neptune-mutual-ropsten";
  }

  if (networkId === 42) {
    return "https://api.thegraph.com/subgraphs/name/neptune-mutual/subgraph-kovan";
  }

  return null;
};
