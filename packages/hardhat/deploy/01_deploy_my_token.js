const MINTING_DURATION = 14 * 24 * 60 * 60; // 14 weeks

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('MyToken', {
    from: deployer,
    args: [MINTING_DURATION],
    log: true,
  });
};
module.exports.tags = ['MyToken'];
