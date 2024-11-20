import { useEffect, useRef, useState } from 'react';
import DrawingApp from '@/features/canvas/DrawingApp';
import { KonvaDrawingTool } from '@/features/canvas/KonvaDrawingTool';

function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [drawingTool, setDrawingTool] = useState<KonvaDrawingTool>(null);

	useEffect(() => {
		if (containerRef.current && !drawingTool) {
			const newDrawingTool = new KonvaDrawingTool(containerRef.current);

			setDrawingTool(newDrawingTool);
		}
	}, [drawingTool]);

	if (!drawingTool) <>loading...</>;

	return <DrawingApp containerRef={containerRef} drawingTool={drawingTool} />;
}

export default Home;
