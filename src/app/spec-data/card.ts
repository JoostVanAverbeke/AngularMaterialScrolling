/*
  {"id":332,"title":"Testing 1","subtitle":"subtitle Testing 1","content":"content Testing 1",
  "status":null,"lane_id":67,"employee_id":1,"created_at":"2018-10-04T17:31:11.028Z",
  "updated_at":"2018-10-04T17:31:11.028Z","duration":null,"estimate":null}
 */
export interface Card {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  status: number;
  lane_id: number;
  employee_id: number;
  created_at: Date;
  updated_at: Date;
  duration: number;
  estimate: number;
}
