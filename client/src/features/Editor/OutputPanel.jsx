import LanguageSelector from "../../components/common/LanguageSelector"




const OutputPanel = ({ action, targetLanguage,  setTargetLanguage, isLoading }) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">
                  {action === "translate" ? "Target Code" : "Output"}
                </h2>
                {action === "translate" && (
                  <LanguageSelector
                    value={targetLanguage}
                    onChange={setTargetLanguage}
                  />
                )}

                {action !== "translate" && (
                  <span className="text-gray-500 text-sm uppercase tracking-wider">
                    {action}
                  </span>
                )}
              </div>

              <div className="mt-4 flex-1 min-h-[300px]">
                {isLoading ? (
                  <div className="loading text-2xl text-gray-750 font-[600]">
                    Processing...
                  </div>
                ) : (
                  <OutputPanel
                    action={action}
                    targetLanguage={
                      action === "translate" ? targetLanguage : null
                    }
                  />
                )}
              </div>
            </div>
          </div>
  )
}

export default OutputPanel
