import React from 'react';

export const Table = ({ children, classname }) => (
    <table className={`w-full border-collapse border   text-center border-gray-200 min-w-max  ${classname}   `}>{children}</table>
);

export const TableHeader = ({ children }) => (
    <thead className="bg-gray-100 text-center ">{children}</thead>
);

export const TableRow = ({ children }) => (
    <tr className="border-b border-gray-200 text-center ">{children}</tr>
);

export const TableHead = ({ children ,classname }) => (
    <th className={`px-4 py-2 text-center ${classname}`}>{children}</th>
);

export const TableBody = ({ children }) => (
    <tbody >{children}</tbody>
);

export const TableCell = ({ children, classname }) => (
    <td className={`px-4 py-2 ${classname}`}>{children}</td>
);
