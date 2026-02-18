import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-red-500/30 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
                    <h3 className="text-red-400 font-bold mb-1">Something went wrong</h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                        {this.state.error?.message || 'Failed to load component'}
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}
