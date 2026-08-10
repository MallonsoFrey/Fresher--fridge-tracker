import { useTranslation, Trans } from "react-i18next";

export default function EmptyFridge({
  setSearchFirstProduct,
  setIsAddProductOpen,
}: {
  setSearchFirstProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddProductOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();

  const handleAddFirstProduct = () => {
    if (setIsAddProductOpen) setIsAddProductOpen(true);
    setSearchFirstProduct(true);
  };

  return (
    <div className="text-center h-fit w-full flex flex-col justify-center items-center gap-5 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-10">{t("emptyFridge.title")}</h1>

        <h2 className="mb-4">{t("emptyFridge.subtitle")}</h2>

        <p>
          <Trans
            i18nKey="emptyFridge.description"
            components={{
              strong: <strong className="font-bold" />,
            }}
          />
        </p>
      </div>

      <div>
        <p className="font-bold mb-3">{t("emptyFridge.examples")}</p>
        <ul className="list-none list-inside flex gap-1 justify-center flex-wrap text-left">
          <li className="shadow-sm text-left w-[150px] flex items-center gap-3 border-[#F4F2ECFA] border-2 rounded-[24px] bg-[_rgba(255,255,255,0.98)] p-2 text-sm">
            <div className="select-none w-fit rounded-[100px] p-2 bg-[_rgba(236,242,230,0.9)]">
              <span className="flex" aria-hidden="true">🥛</span>
            </div>
            {t("emptyFridge.products.milk")}
          </li>
          <li className="shadow-sm text-left w-[150px] flex items-center gap-3 border-[#F4F2ECFA] border-2 rounded-[24px] bg-[_rgba(255,255,255,0.98)] p-2 text-sm">
            <div className="select-none w-fit rounded-[100px] p-2 bg-[_rgba(236,242,230,0.9)]">
              <span className="flex" aria-hidden="true">🥚</span>
            </div>
            {t("emptyFridge.products.eggs")}
          </li>
          <li className="shadow-sm text-left w-[150px] flex items-center gap-3 border-[#F4F2ECFA] border-2 rounded-[24px] bg-[_rgba(255,255,255,0.98)] p-2 text-sm">
            <div className="select-none w-fit rounded-[100px] p-2 bg-[_rgba(236,242,230,0.9)]">
              <span className="flex" aria-hidden="true">🧀</span>
            </div>
            {t("emptyFridge.products.cheese")}
          </li>
        </ul>
      </div>

      <button
        onClick={handleAddFirstProduct}
        className="flex justify-center items-center w-full md:w-[300px] h-8 transition-transform duration-100 ease-in-out hover:shadow-md bg-[#E8EFE3] hover:bg-[#6F8D67] text-[#5D7155] hover:text-white border-none outline-none text-sm py-4 px-5 rounded-[22px]"
      >
        {t("buttons.firstAddButton")}
      </button>
    </div>
  );
}
