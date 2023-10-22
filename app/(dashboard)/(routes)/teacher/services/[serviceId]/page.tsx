import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { PanelTop, ListChecks, Wallet, File } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";

const ServiceIdPage = async ({ params }: { params: { serviceId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const service = await db.service.findUnique({
    where: { id: params.serviceId },
    include: {
      attachments:{
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: [{ name: "asc" }],
  });

  if (!service) {
    return redirect("/");
  }

  const requiredFields = [
    service.title,
    service.description,
    service.imageUrl,
    service.price,
    service.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="2xl font-medium">service setup</h1>
          <p className="text-sm text-slate-700">
            Completed fields {completionText}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={PanelTop} />
            <h2 className="text-xl">Customise your service</h2>
          </div>
          <TitleForm initialData={service} serviceId={service.id} />
          <DescriptionForm initialData={service} serviceId={service.id} />
          <ImageForm initialData={service} serviceId={service.id} />
          <CategoryForm
            initialData={service}
            serviceId={service.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">service chapters</h2>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Wallet} />
            <h2 className="text-xl">Sell your GIG</h2>
          </div>
          <PriceForm initialData={service} serviceId={service.id} />
          <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">
                  Resources & Attachments
                </h2>
              </div>
              <AttachmentForm
                initialData={service}
                serviceId={service.id}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceIdPage;
