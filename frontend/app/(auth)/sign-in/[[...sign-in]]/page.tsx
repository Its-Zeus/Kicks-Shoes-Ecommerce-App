import Spacing from "@/app/_constants/Spacing";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className={`${Spacing} flex justify-center mt-10`}>
      <SignIn path="/sign-in" />
    </div>
  )
}