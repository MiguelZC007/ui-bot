import { useState } from "react";
import {
  GptOrthographyMessage,
  MyMessage,
  TextMessageBoxFile,
  TypingLoader,
} from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  file?: File;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | undefined>();

  const handlePost = async (phone: string, text: string, file?: File) => {
    setIsLoading(true);
    setFile(file);
    setMessages((prev) => [...prev, { text: text, file: file, isGpt: false }]);

    const { ok, message } = await orthographyUseCase(phone, text, file);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        {
          text: "No se pudo realizar la corrección",
          file: undefined,
          isGpt: true,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message as string,
          file: file,
          isGpt: true,
          info: { message: message as string, userScore: 0, errors: [] },
        },
      ]);
    }

    // Todo: Añadir el mensaje de isGPT en true

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div
        className="chat-messages"
        ref={(el) => el?.scrollTo(0, el.scrollHeight)}
      >
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage key={index} {...message.info!} />
            ) : (
              <MyMessage key={index} text={message.text} file={message.file} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>

        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => {
            const chatContainer = document.querySelector(".chat-messages");
            chatContainer?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ↑
        </button>
      </div>

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
        accept="image/*,application/pdf"
      />
    </div>
  );
};
