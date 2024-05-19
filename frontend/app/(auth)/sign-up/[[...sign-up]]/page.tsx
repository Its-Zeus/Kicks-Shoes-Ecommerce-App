import Spacing from "@/app/_constants/Spacing";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className={`${Spacing} flex justify-center mt-10`}>
      <SignUp path="/sign-up" />
    </div>
  )
}

