import React from 'react';

export const Table = ({ children }) => (
    <table className="w-full border-collapse border  text-center border-gray-200 min-w-max   ">{children}</table>
);

export const TableHeader = ({ children }) => (
    <thead className="bg-gray-100 text-center ">{children}</thead>
);

export const TableRow = ({ children }) => (
    <tr className="border-b border-gray-200 ">{children}</tr>
);

export const TableHead = ({ children }) => (
    <th className="px-4 py-2 text-left font-semibold  ">{children}</th>
);

export const TableBody = ({ children }) => (
    <tbody >{children}</tbody>
);

export const TableCell = ({ children }) => (
    <td className="px-4 py-2">{children}</td>
);
