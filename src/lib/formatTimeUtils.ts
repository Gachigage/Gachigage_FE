export const  formatChatDay = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfTarget = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffMs = startOfToday.getTime() - startOfTarget.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const period = hours < 12 ? "오전" : "오후";
    hours = hours % 12 || 12;

    return `${period} ${hours}:${minutes}`;
  }

  if (diffDays > 0 && diffDays <= 7) {
    return `${diffDays}일 전`;
  }

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
}

export const formatChatTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const isAm = hours < 12;
  const period = isAm ? "오전" : "오후";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${period} ${hours}:${minutes}`;
}

