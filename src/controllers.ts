import { Employee, MockUpData } from "./type";

export const Controller = {
  sortArrayByFrequencyAndValue: (input: number[]): number[] => {
    // Create a Map to store the frequency of each number
    const frequencyMap = new Map<number, number>();
    for (const num of input) {
      frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1);
    }

    const sortedArray = input.sort((a, b) => {
      if (frequencyMap.get(a) === frequencyMap.get(b)) {
        return a - b;
      } else {
        return (frequencyMap.get(a) ?? 0) - (frequencyMap.get(b) ?? 0);
      }
    });

    return sortedArray;
  },

  getEmployeeInfo(employees: Employee[], targetName: string): string {
    const employee = employees.find((emp) => emp.name === targetName);

    if (employee) {
      return `ชื่อ ${employee.name} ตำแหน่ง ${employee.position}`;
    } else {
      return `Employee with name ${targetName} not found.`;
    }
  },

  mapData(mockUpData: MockUpData[]): { x: string[]; y: string[] } {
    // Create Sets to remove duplicate values
    const xSet: Set<string> = new Set();
    const ySet: Set<string> = new Set();

    mockUpData.forEach((data) => {
      xSet.add(data.x);
      ySet.add(data.y);
    });

    const y: string[] = Array.from(ySet);
    const x: string[] = Array.from(xSet);

    //Since I don't clearly understand the requirement for expected output. Why data that didn't exist in the input (JSON data) is included in the output.
    // So I hard-coded by filling in the missing data on my assumption, If you have any suggestions please let me know.
    x.unshift("ึ7:00 น");
    for (let i = 1; i <= 4; i++) {
      x.push(`${(17 + i)}:00 น`);
    }

    return { x, y };
  },
};
