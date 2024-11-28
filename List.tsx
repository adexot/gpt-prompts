import { CopyButton } from "~CopyButton";

export function List({ children }) {
    return (
        <ul className="space-y-3 list-none p-0">
            {children}
        </ul>
    );
}

export function ListItem({ children, copyText, onClick }) {
    return (
        <li className="relative p-4 border rounded-lg bg-card cursor-pointer hover:border-slate-400" onClick={onClick}>
            {copyText && (
                <div className="absolute top-2 right-2">
                    <CopyButton text={copyText} />
                </div>
            )}
            <div className="pr-8">{children}</div>
        </li>
    );
}