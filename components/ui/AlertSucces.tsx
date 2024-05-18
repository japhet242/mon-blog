import { FcCheckmark } from "react-icons/fc";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertSucces({message}:{message:string|undefined}) {
  return message !==undefined && message !==""?
    <Alert variant='succes'>
     <FcCheckmark className="h-4 w-4 " />
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert> :null
}
