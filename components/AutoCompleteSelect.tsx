import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

interface AutoCompleteSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  options: string[]
  label: string
  placeholder: string
  commandPlaceholder: string
  commandEmpty: string
  className?: string
  optionsClassName?: string
  disabled?: boolean
}

function AutoCompleteSelect<T extends FieldValues>({
  form,
  name,
  options,
  label,
  placeholder,
  commandPlaceholder,
  commandEmpty,
  className,
  optionsClassName,
  disabled = false,
}: AutoCompleteSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const { setValue } = form

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="">
                    <Button
                      type="button"
                      disabled={disabled}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between rounded-md border-2  border-primary',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? options.find((value) => value === field.value)
                        : placeholder}

                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className={optionsClassName}>
                <Command>
                  <CommandInput placeholder={commandPlaceholder} />
                  <CommandEmpty>{commandEmpty}</CommandEmpty>
                  <CommandGroup className="max-h-40 overflow-auto">
                    {options.map((value) => (
                      <CommandItem
                        value={value}
                        key={value}
                        onSelect={() => {
                          setValue(name, value as PathValue<T, Path<T>>)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === field.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {value}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )
      }}
    />
  )
}

export default AutoCompleteSelect
