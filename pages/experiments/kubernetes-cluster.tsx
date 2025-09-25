/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";

const Article = () => {
    const { theme } = useTheme();
    return (
        <PageLayout standard>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                <Image src="/public/imp_assets/posts/kubernetes/kubernetes_cluster.png" alt="Kubernetes Cluster" size={ImageSize.MEDIUM} />
                <Text p>
                    I've been watching hosting costs for my hobbies creep up over time and this has motivated me look into self hosting solutions.
                    I decided to look into building my own kubernetes cluster as a way to do that and here's the requirements
                    I set for this project:
                </Text>
                <List type={ListType.disc} className="mt-5">
                    <li>It must have the ability to host multiple services</li>
                    <li>Cost less than what I'm paying now on AWS and not increase costs with new services</li>
                    <li>Be able to link them to domains I own in a secure way</li>
                    <li>Work with a dynamic IP as my ISP doesn't offer static IPs</li>
                    <li>Have a consistent way to deploy services</li>
                </List>
                <Text p subtitle>
                    Current AWS Costs
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes/aws_costs.png" alt="AWS Costs" size={ImageSize.MEDIUM} />
                <Text p>
                    As you can see I'm paying around £200 per month for my hobby services.
                    I'm not using any of the more expensive services like RDS, S3, etc.
                    I'm using a lot of free services like SQS, SNS, etc.
                    But even so, the cost is still too high for my liking.
                    So I decided to look into building my own kubernetes cluster as a way to do that.
                </Text>
                
                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/experiments/kubernetes-cluster",
                        identifier: "kubernetes-cluster",
                        title: "Building a Kubernetes Cluster",
                    }
                }></DiscussionEmbed>
            </div>
        </PageLayout>
    )
}

export default Article;
