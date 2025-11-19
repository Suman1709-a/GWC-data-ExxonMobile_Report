  export default function getTodayDateStrings() {
      // today date
      const date = new Date(); //"2025-08-01"

      const todayStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      // Get sunday of current week
      const currentDay = date.getDay();
      const daysSinceMonday = (currentDay + 6) % 7; // Convert Sunday=0 to Monday=0 base

      const monday = new Date(date);
      monday.setDate(date.getDate() - daysSinceMonday);

      const mondayStr = `${monday.getFullYear()}-${String(
        monday.getMonth() + 1
      ).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;

      return { todayStr, mondayStr };
    }