type methodList = "GET" | "POST" | "PUT" | "DELETE";

interface responseType {
  status: number;
  data: any;
  details: any;
}

export default responseType;
export type { methodList };
