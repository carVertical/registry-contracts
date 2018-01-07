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
      // from: '0xffe6c85d150b70a45a1d587a74ba9a0e773a9768',
      network_id: "*"
    }
  }
};
