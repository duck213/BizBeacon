import { Suspense } from 'react';
import { AnalysisReport } from '../../pages/AnalysisReport';

export default function AnalysisPage() {
  return (
    <Suspense fallback={<div>Loading analysis...</div>}>
      <AnalysisReport />
    </Suspense>
  );
}
