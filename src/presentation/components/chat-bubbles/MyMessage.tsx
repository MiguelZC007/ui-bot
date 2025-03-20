interface Props {
  text: string;
  file?: File;
}

export const MyMessage = ({ text, file }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          F
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
          <div>{text}</div>
          {file && (
            <div
              className="mt-2 text-xs text-gray-300 cursor-pointer"
              onClick={() => {
                // Abrir un modal con vista previa del archivo
                const url = URL.createObjectURL(file);
                const newWindow = window.open("", "_blank");
                if (newWindow) {
                  const fileType = file.type.startsWith("image/")
                    ? "image"
                    : "application/pdf";
                  if (fileType === "image") {
                    newWindow.document.write(`
                      <img src="${url}" style="max-width: 100%; max-height: 100%; display: block; margin: 0 auto;"/>
                    `);
                  } else {
                    newWindow.document.write(`
                      <iframe src="${url}" width="100%" height="100%" style="border: none;"></iframe>
                    `);
                  }
                }
              }}
            >
              <i className="fa-solid fa-paperclip text-sm mr-3"></i>
              {file.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
