import Link from "next/link";
import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-4">
//       <div className="container mx-auto text-center text-sm">
//         <div className="flex h-5 mx-4 items-center space-x-6 text-sm">
//           <div>Blog</div>
//           <Separator orientation="vertical" />
//           <div>About Us</div>
//           <Separator orientation="vertical" />
//           <div>Contact Us</div>
//         </div>
//         <Separator className="my-4" />
//         <h4 className="text-sm font-medium leading-none">
//           &copy; {new Date().getFullYear()} Comparely. All rights reserved.
//         </h4>
//       </div>
//     </footer>
//   );
// };

export const Footer = () => {
  return (
    <footer id="footer" className="container pb-8 lg:pb-16 mx-auto">
      <div className="p-10 bg-muted border rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Logo />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Platforms</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                iOS
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Android
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Web
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Help</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Feedback
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Socials</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitch
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Discord
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Dribbble
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Comparely. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
