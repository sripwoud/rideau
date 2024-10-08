import { useMagic } from "@client/h/useMagic"
//import { useUser } from "../context/UserContext"

export const ConnectButton = () => {
  const { magic } = useMagic()
  //const { fetchUser } = useUser()

  const handleConnect = async () => {
      console.log(magic)
    try {
      await magic?.wallet.connectWithUI()
  //    await fetchUser()
    } catch (error) {
      console.error("handleConnect:", error)
    }
  }

  return (
    <button
      type="button"
      className="w-auto border border-white text-color font-bold p-2 rounded-md"
      onClick={handleConnect}
    >
      Connect
    </button>
  )
}
