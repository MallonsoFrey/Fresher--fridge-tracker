import { useRef, useState, useEffect } from "react";
import { maskDateInput } from "@/utils/maskDateInput";
import { format, isValid, parse } from "date-fns";
import { DayPicker, type Locale } from "react-day-picker";
import { useTranslation } from "react-i18next";
import "react-day-picker/dist/style.css";
import CalendarButton from "@/components/CalendarButton";

type DateInputProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  inputLabel: string;
  locale: Locale;
  currentLanguage: string;
  calendarAriaLabel: string;
  resetKey: number;
};

export default function DateInput({
  inputLabel,
  locale,
  currentLanguage,
  calendarAriaLabel,
  selectedDate,
  setSelectedDate,
  resetKey,
}: DateInputProps) {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const lastValidDateInputRef = useRef("");
  const [dateValue, setDateValue] = useState("");
  const [month, setMonth] = useState(new Date());
  const { t } = useTranslation();

  useEffect(() => {
    if (!resetKey) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateValue("");
    setSelectedDate(undefined);
    setMonth(new Date());
  }, [resetKey, setSelectedDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked, isComplete } = maskDateInput(e.target.value);

    if (!isComplete) {
      setDateValue(masked);
      setSelectedDate(undefined);
      return;
    }

    const parsedDate = parse(masked, "dd/MM/yyyy", new Date());

    const strictlyMatchesMask =
      isValid(parsedDate) && format(parsedDate, "dd/MM/yyyy") === masked;

    if (!strictlyMatchesMask) {
      setDateValue(lastValidDateInputRef.current);
      setSelectedDate(
        lastValidDateInputRef.current
          ? parse(lastValidDateInputRef.current, "dd/MM/yyyy", new Date())
          : undefined,
      );
      return;
    }

    lastValidDateInputRef.current = masked;
    setDateValue(masked);
    setSelectedDate(parsedDate);
    setMonth(parsedDate);
  };

  const toggleCalendar = () => setIsCalendarOpen((prev) => !prev);
  const calendarLabel = t("addProduct.calendarLabel", {
    month: format(month, "dd MMMM yyyy", {
      locale,
    }),
  });

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setDateValue("");
      lastValidDateInputRef.current = "";
      setSelectedDate(undefined);
      return;
    }

    setSelectedDate(date);
    setMonth(date);
    const masked = format(date, "dd/MM/yyyy");
    lastValidDateInputRef.current = masked;
    setDateValue(masked);

    setIsCalendarOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        isCalendarOpen
      ) {
        toggleCalendar();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  return (
    <div ref={calendarRef} className="relative flex flex-col gap-2">
      <label htmlFor="date-input" className="text-sm font-bold">
        {inputLabel}
      </label>
      <input
        className="w-full h-12 px-4 md:text-sm text-[#4F574D] placeholder:text-[#4f574dbd] bg-[#F6F4EE] rounded-[24px]"
        id="date-input"
        type="text"
        value={dateValue}
        placeholder={currentLanguage === "ru" ? "дд/мм/гггг" : "dd/mm/yyyy"}
        onChange={handleInputChange}
      />
      <CalendarButton
        isCalendarOpen={isCalendarOpen}
        toggleCalendar={toggleCalendar}
        calendarAriaLabel={calendarAriaLabel}
      />
      {isCalendarOpen && (
        <div className="absolute z-50 md:mt-2 w-max rounded-[16px] border border-[#F6F4EE] bg-white shadow-lg p-2 md:top-full left-0">
          <DayPicker
            locale={locale}
            weekStartsOn={1}
            mode="single"
            month={month}
            onMonthChange={setMonth}
            autoFocus
            role="application"
            aria-label={calendarLabel}
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
          />
        </div>
      )}
    </div>
  );
}
