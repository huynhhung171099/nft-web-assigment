export async function getCurrentAccount() {
  if (window.ethereum) {
    const accounts = (await window.ethereum.request({
      method: "eth_accounts",
    })) as any;
    let account = accounts[0];
    window.ethereum.on("accountsChanged", function(accounts: any) {
      // Time to reload your interface with accounts[0]!
      account = accounts[0];
    });
    return account as string;
  }
}
