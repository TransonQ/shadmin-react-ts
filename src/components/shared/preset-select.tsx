type PresetSelectProps<T extends boolean> = T extends true
  ? {
      title?: string
      placeholder?: string
      disabled?: boolean
      options?: { label: string; value: string }[]
      multiple: true
      value: string[]
      onChange: (value: string[]) => void
    }
  : {
      title?: string
      placeholder?: string
      disabled?: boolean
      options?: { label: string; value: string }[]
      multiple?: false
      value: string
      onChange: (value: string) => void
    }

export function PresetSelect<T extends boolean>({
  title,
  placeholder,
  disabled,
  options,
  multiple,
  value,
  onChange,
}: PresetSelectProps<T>): JSX.Element {
  return (
    <div>
      <label>{title}</label>
      <select
        multiple={multiple}
        value={multiple ? value : [value]}
        onChange={(e) => {
          const selectedValues = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          )
          if (multiple) onChange(selectedValues)
          else onChange(selectedValues[0])
        }}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
