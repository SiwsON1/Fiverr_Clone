import { Button } from "@/components/ui/button";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <div className="p-6">
        <Link href ="/teacher/create">

      <Button>New Service</Button>
      </Link>
    </div>
  );
};

export default ServicesPage;
