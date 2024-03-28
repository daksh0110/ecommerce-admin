import multiparty from "multiparty";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/dbconfig";
import fs from "fs";
import { useRouter } from "next/router";

export default async function handle(req, res) {
  const imagesURL = [];
  const { method } = req;

  if (method === "POST") {
    const form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
      const title = fields.Title && fields.Title[0];
      for (const key in files) {
        const fileObjects = files[key];
        for (const fileObject of fileObjects) {
          console.log(fileObject.originalFilename);
          const storageRef = ref(
            storage,
            `/images/` + title + `/` + `${fileObject.originalFilename}`
          );

          const metadata = {
            contentType: "image/jpeg",
          };
          const fileBuffer = fs.readFileSync(fileObject.path);
          await uploadBytes(storageRef, fileBuffer, metadata)
            .then((snapshot) => {
              console.log("Uploaded a blob or file!");

              return getDownloadURL(
                ref(
                  storage,
                  `/images/` + title + `/` + `${fileObject.originalFilename}`
                )
              );
            })
            .then((url) => {
              console.log("URL==" + url);
              res.json(url);
            });
        }
      }
    });
  }
}
export const config = {
  api: { bodyParser: false, externalResolver: true },
};
