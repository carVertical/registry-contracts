module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    local: {
      host: "localhost",
      port: 9595,
      from: "0xcf6d21bc51f1782f3dc83fb274e909b34cdfd260",
      network_id: "*"
    }
  }
};
