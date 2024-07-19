export interface Employee {
  id: number,
  name: string,
  role: string,
  joinedDate: Date,
  isCurrentEmployee: boolean,
  resignedDate: Date | null,
  
}
