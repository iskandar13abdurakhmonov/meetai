"use client"

import {useTRPC} from "@/trpc/client";
import { useSuspenseQuery} from "@tanstack/react-query";
import {LoadingState} from "@/components/loading-state";
import {ErrorState} from "@/components/error-state";
import {DataTable} from "@/components/data-table";
import {columns} from "@/modules/meetings/ui/components/columns";
import {EmptyState} from "@/components/empty-state";

export const MeetingsView = () => {
    const trpc = useTRPC()

    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable columns={columns} data={data.items}/>
            {data.items.length === 0 && (
                <EmptyState
                    title="Create your first meeting"
                    description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
                />
            )}
        </div>
    )
}

export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="This may take a few seconds"/>
    )
}

export const MeetingsViewError = () => {
    return (
        <ErrorState title="Error Loading Mettings" description="Please try again later"/>
    )
}