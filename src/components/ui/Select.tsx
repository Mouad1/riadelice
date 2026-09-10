import { SelectHTMLAttributes, forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  icon?: LucideIcon;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, id, icon: Icon, ...props }, ref) => (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-200">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && <Icon size={18} className="text-dark-400 pointer-events-none absolute left-4" />}
        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors",
            Icon && "pl-11",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
);
Select.displayName = "Select";
export { Select };