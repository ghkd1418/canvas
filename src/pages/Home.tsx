import { useEffect, useRef, useState } from 'react';

import DrawingApp from '@/features/canvas/DrawingApp';
import { KonvaDrawingTool } from '@/features/canvas/KonvaDrawingTool';

function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [drawingTool, setDrawingTool] = useState<KonvaDrawingTool | null>(null);

	useEffect(() => {
		if (containerRef.current) {
			const tool = new KonvaDrawingTool(containerRef.current);
			setDrawingTool(tool);
		}
	}, []);

	return <DrawingApp containerRef={containerRef} drawingTool={drawingTool!} />;
}

export default Home;
