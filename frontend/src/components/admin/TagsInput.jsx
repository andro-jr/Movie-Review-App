import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = ({ name, onChange, value }) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const input = useRef();
  const tagsInputs = useRef();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") {
      setTag(value);
    }

    onChange(tags);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;

      if (tags.includes(tag)) return setTag("");

      setTags([...tags, tag]);
      setTag("");
    }

    if (key === "Backspace" && !tag && tags.length) {
      tags.pop();
      setTags([...tags]);
    }
  };

  const removeTag = (tag) => {
    const index = tags.indexOf(tag);
    tags.splice(index, 1);
    setTags([...tags]);
  };

  const handleOnFocus = () => {
    tagsInputs.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInputs.current.classList.add("dark:border-white", "border-primary");
  };
  const handleOnBlur = () => {
    tagsInputs.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInputs.current.classList.remove("dark:border-white", "border-primary");
  };

  useEffect(() => {
    if (value.length) setTags(value);
  }, [value]);

  useEffect(() => {
    input.current.scrollIntoView();
  }, [tag]);

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  return (
    <div>
      <div
        ref={tagsInputs}
        onKeyDown={handleKeyDown}
        className='border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full flex items-center space-x-2 custom-scroll-bar overflow-x-auto transition'
      >
        {tags.map((tag) => (
          <Tag key={tag} onClickFn={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
        <input
          ref={input}
          type='text'
          id={name}
          className='h-full flex-grow bg-transparent outline-none dark:text-white text-primary'
          placeholder='Tag one, tag two'
          value={tag}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
};

const Tag = ({ children, onClickFn }) => {
  return (
    <span className='dark:bg-white bg-primary dark:text-primary  text-white flex items-center px-1.5 rounded py-1 text-xs font-semibold gap-1 whitespace-nowrap'>
      {children}
      <button onClick={onClickFn} type='button'>
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};

export default TagsInput;
