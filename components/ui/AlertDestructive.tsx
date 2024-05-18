import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive({message}:{message:string|undefined}) {
  return message !==undefined && message !==""?
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4 " />
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert> :null
}
