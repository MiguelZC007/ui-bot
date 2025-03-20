import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (phone: string, message: string, file?: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string; // image/*
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("+59160365521");

  const [selectedFile, setSelectedFile] = useState<File | null>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSendMessage(phone, message, selectedFile || undefined);
    setMessage("");
    setSelectedFile(null);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        {selectedFile ? (
          <div className="text-sm text-gray-600 flex items-center border rounded-xl p-2">
            <span
              className="mr-2 truncate"
              style={{
                maxWidth: "100px",
                display: "inline-block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={selectedFile.name}
            >
              {selectedFile.name}
            </span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                setSelectedFile(null);
                if (inputFileRef.current) {
                  inputFileRef.current.value = "";
                }
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              onClick={() => inputFileRef.current?.click()}
            >
              <i className="fa-solid fa-paperclip text-xl"></i>
            </button>

            <input
              type="file"
              ref={inputFileRef}
              accept={accept}
              onChange={(e) => setSelectedFile(e.target.files?.item(0))}
              hidden
            />
          </>
        )}
      </div>

      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-end ml-4">
        <div className="relative w-[150px]">
          <input
            type="text"
            autoFocus
            name="phone"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary" type="submit">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
