type Props = {
  numDateUTC?: Date;
  numMonthNumDateUTC?: Date;
  shortMonthNumDateUTC?: Date;
  fullFormatUTC?: Date;
};

export default function FormatDate({
  numDateUTC,
  numMonthNumDateUTC,
  shortMonthNumDateUTC,
  fullFormatUTC,
}: Props) {
  if (numDateUTC) {
    return numDateUTC.toLocaleDateString("en-US", {
      day: "2-digit",
      timeZone: "UTC",
    });
  } else if (numMonthNumDateUTC) {
    return numMonthNumDateUTC.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      timeZone: "UTC",
    });
  } else if (shortMonthNumDateUTC) {
    return shortMonthNumDateUTC.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  } else if (fullFormatUTC) {
    return fullFormatUTC.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  } else {
    return null;
  }
}
