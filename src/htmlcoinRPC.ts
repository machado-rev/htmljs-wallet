import RpcClient, {IConfig} from "htmlcoind-rpc"

import {Network, NetworkNames} from "./Network"

export default class QtumRPC {
  public rpc: RpcClient

  constructor(config?: IConfig) {
    this.rpc = new RpcClient(config)
  }

  public generate(nblocks: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.rpc.generate(1, (err, ret) => {
        if (err) {
          reject(err)
        }
        resolve(ret)
      })
    })
  }
}

export const rpcClient = new QtumRPC({
  user: "althash",
  pass: "password",
  port: "14889",
  protocol: "http",
})

export async function generateBlock(network: Network) {
  // generate a block after creating contract
  if (network.info.name === NetworkNames.REGTEST) {
    await rpcClient.generate(1)
  }
}
