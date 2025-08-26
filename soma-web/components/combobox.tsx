"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Publication } from "@/redux/user-store/userPublicationsSlice"

interface ExampleComboboxProps {
    publications: Publication[];
    selectedPublication?: Publication | null;
    onPublicationSelect?: (publication: Publication | null) => void;
}

export function ExampleCombobox({ publications, selectedPublication, onPublicationSelect }: ExampleComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(selectedPublication?.publication_id ? selectedPublication.publication_id.toString() : "")

    // Update value when selectedPublication changes or when publications change
    React.useEffect(() => {
        if (selectedPublication?.publication_id) {
            setValue(selectedPublication.publication_id.toString());
        } else if (publications.length > 0 && !value) {
            // Set first publication as default if no publication is selected
            const firstPub = publications[0];
            if (firstPub?.publication_id) {
                setValue(firstPub.publication_id.toString());
                if (onPublicationSelect) {
                    onPublicationSelect(firstPub);
                }
            }
        }
    }, [selectedPublication, publications, value, onPublicationSelect]);

    const handleSelect = (currentValue: string) => {
        const newValue = currentValue === value ? "" : currentValue;
        setValue(newValue);
        
        if (onPublicationSelect) {
            const selected = newValue ? publications.find(pub => pub.publication_id && pub.publication_id.toString() === newValue) || null : null;
            onPublicationSelect(selected);
        }
        
        setOpen(false);
    };

    const selectedPub = publications.find(pub => pub.publication_id && pub.publication_id.toString() === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedPub
                        ? selectedPub.publication_name || selectedPub.publication_username
                        : "Select publication..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search publications..." />
                    <CommandList>
                        <CommandEmpty>No publication found.</CommandEmpty>
                        <CommandGroup>
                            {publications.map((publication) => (
                                publication.publication_id ? (
                                    <CommandItem
                                        key={publication.publication_id}
                                        value={`${publication.publication_id}:${publication.publication_name || publication.publication_username}:${publication.publication_username}:${publication.publication_owner_bio || ''}`}
                                        onSelect={(currentValue) => {
                                            // Extract the ID from the value string
                                            const publicationId = currentValue.split(':')[0];
                                            handleSelect(publicationId);
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === publication.publication_id.toString() ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {publication.publication_name || publication.publication_username}
                                    </CommandItem>
                                ) : null
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}