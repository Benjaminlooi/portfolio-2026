import { LinkIcon } from "lucide-react";

type HeadingTag = "h1" | "h2" | "h3";

interface HeadingWithAnchorProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as: HeadingTag;
}

export function HeadingWithAnchor({
  as: Tag,
  id,
  children,
  ...props
}: HeadingWithAnchorProps) {
  return (
    <Tag id={id} className="heading-anchor-group" {...props}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="heading-anchor"
          aria-label={`Link to ${typeof children === "string" ? children : "section"}`}
        >
          <LinkIcon className="h-4 w-4" />
        </a>
      )}
    </Tag>
  );
}
