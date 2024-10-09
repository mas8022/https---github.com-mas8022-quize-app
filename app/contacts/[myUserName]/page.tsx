import React, { memo } from "react";
import messageModel from "@/models/message";
import ContactsBody from "@/app/components/template/contactsBody";

const page = memo(async ({ params }: { params: { myUserName: string } }) => {
  const myUserName = params.myUserName;

  const contactsArray: string[] = await messageModel.distinct("sender", {
    receiver: myUserName,
  });

  const receivedContacts: string[] = await messageModel.distinct("receiver", {
    sender: myUserName,
  });

  const uniqueContactsObj: Record<string, boolean> = {};

  contactsArray.forEach((contact) => {
    uniqueContactsObj[contact] = true;
  });

  receivedContacts.forEach((contact) => {
    uniqueContactsObj[contact] = true;
  });

  const contacts: string[] = Object.keys(uniqueContactsObj);

  return <ContactsBody contactsData={JSON.parse(JSON.stringify(contacts))} />;
});

export default page;
