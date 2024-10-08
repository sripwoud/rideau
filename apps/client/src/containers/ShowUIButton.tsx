import { useMagic } from "@client/h/MagicProvider"

export const ShowUIButton = () => {
  const { magic } = useMagic()

  const handleShowUI = async () => {
    try {
      await magic?.wallet.showUI()
    } catch (error) {
      console.error("handleShowUI:", error)
    }
  }

  return (
    <button
      className="w-auto border border-white font-bold p-2 rounded-md text-color"
      onClick={handleShowUI}
    >
      Show UI
    </button>
  )
}
