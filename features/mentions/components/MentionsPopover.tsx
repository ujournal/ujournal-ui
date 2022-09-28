import { Box, Button, Popover } from "@mantine/core";
import { useSearch } from "features/search/hooks/useSearch";
import { FC, ReactNode, SyntheticEvent, useCallback, useState } from "react";
import { PersonSafe, SearchType } from "ujournal-lemmy-js-client";

export const MentionsPopover: FC<{
  children: ReactNode;
  q: string | undefined;
  onSelect: (person: PersonSafe) => void;
}> = ({ children, q: name, onSelect: onSelected }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const search = useSearch({
    q: name?.substring(1) || "",
    type: SearchType.Users,
  });

  const handleSelect = useCallback(
    (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
      const id = parseInt(event.currentTarget.dataset.id as string, 10);

      if (search.data) {
        const person = search.data.users.find(
          (person) => person.person.id === id
        );
        if (person) {
          onSelected(person.person);
        }
      }
    },
    [onSelected, search.data]
  );

  return (
    <Popover
      opened={popoverOpened && search.data?.users.length ? true : false}
      position="top"
      width="target"
      transition="pop"
      styles={{
        dropdown: {
          zIndex: 1000000,
        },
      }}
    >
      <Popover.Target>
        <Box
          component="div"
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
          sx={{ width: "100%" }}
        >
          {children}
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        {search.data?.users.map(({ person }) => (
          <Button
            key={person.id}
            variant="subtle"
            onClick={handleSelect}
            data-id={person.id}
          >
            <>
              @{person.name}{" "}
              {person.display_name.unwrapOr("")
                ? `(${person.display_name.unwrapOr("")})`
                : ""}
            </>
          </Button>
        ))}
      </Popover.Dropdown>
    </Popover>
  );
};
