import { PlusIcon } from "@heroicons/react/outline";
import Picker from "emoji-picker-react";
import { useState } from "react";

interface PickEmojiProps {
  emoji: string;
}

export default function PickEmoji(props: PickEmojiProps) {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event: Event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const showPicker = false;

  return (
    <>
      <button
        type="button"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {
          // if there is an emoji, display it
          props.emoji ? (
            <span className="inline-block w-full h-full overflow-hidden text-3xl">
              {props.emoji}
            </span>
          ) : (
            <PlusIcon className="mx-auto h-8 w-8 text-gray-400" />
          )
        }
      </button>
    </>
  );
}
