module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("OneTwoThree", {
    from: deployer,
    args: [30],
    log: true,
  });
};
module.exports.tags = ["OneTwoThree"];