module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
      local: {
          host: "localhost",
          port: 8545,
          from: "0x79f17ef469eff7fd51a28de840cc6bab2e4b5b0d",
          network_id: "*"
      }
  },
    solc: { optimizer: { enabled: true, runs: 200 } }
};
