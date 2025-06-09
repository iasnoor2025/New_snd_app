import React from 'react';

const CategorySummaryTable = ({ categories, formatCurrency }: { categories: any[]; formatCurrency: (n: number) => string }) => (
  <table className="min-w-full text-sm">
    <thead>
      <tr>
        <th className="text-left">Category</th>
        <th className="text-left">Value</th>
      </tr>
    </thead>
    <tbody>
      {categories?.map((cat, idx) => (
        <tr key={idx}>
          <td>{cat.category_name}</td>
          <td>{formatCurrency(cat.current_value)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CategorySummaryTable;
