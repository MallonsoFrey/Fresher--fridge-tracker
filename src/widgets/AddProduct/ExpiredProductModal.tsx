import { useTranslation } from "react-i18next";

export default function ExpiredProductModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div
      className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="expired-product-modal-title"
    >
      <div className="flex gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <h2 id="expired-product-modal-title" className="font-bold">
          {t("expiredProductModal.title")}
        </h2>
        <p>{t("expiredProductModal.description")}</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="transition-all duration-300 hover:bg-[_rgba(236,242,230,0.9)] hover:text-[#687063]  text-[_rgba(236,242,230,0.9)] bg-[#687063] py-2 px-4 rounded-[100px] cursor-pointer"
          >
            {t("buttons.cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="transition-all duration-300 bg-[#9A5752] text-[#F3DDDD] hover:text-[#9A5752] hover:bg-[#F3DDDD] py-2 px-4 rounded-[100px] cursor-pointer"
          >
            {t("buttons.add")}
          </button>
        </div>
      </div>
    </div>
  );
}
