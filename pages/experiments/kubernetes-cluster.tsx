/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";
import { CodeBlock } from "../../src/components";


const Article = () => {
    const { theme } = useTheme();
    return (
        <PageLayout standard PAGE_SEO={
            {
                title: "Self Hosting Kubernetes",
                description: "Saving money with a raspberry pi kubernetes cluster",
                keywords: "kubernetes, cluster",
                author: "Noel Wilson",
                ogImage: "/public/imp_assets/posts/kubernetes_cluster/raspberry_cluster.jpeg"
            }
        }>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/raspberry_cluster.jpeg" alt="Raspberry PI Kubernetes Cluster" size={ImageSize.SMALL} />
                <Text p>
                    I've been watching hosting costs for my hobbies creep up over time and this has motivated me look into self hosting solutions.
                    After thinking about what I need for my projects here's the requirements I set myself:
                </Text>
                <List type={ListType.disc} className="mt-5">
                    <li>It must have the ability to host multiple services</li>
                    <li>Cost less than what I'm paying now on AWS</li>
                    <li>New services should not increase costs or only increase minimally</li>
                    <li>Be able to link them to domains I own in a secure way</li>
                    <li>Work with a dynamic IP as my ISP doesn't offer static IPs</li>
                </List>
                <Text p subtitle>
                    Current AWS Costs
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/aws_costs.png" alt="AWS Costs" size={ImageSize.MEDIUM} />
                <Text p>
                    I'm paying around $75 per month for my hobby services, and <LinkTo href="https://www.reddit.com/r/ProgrammerHumor/comments/1eayj9a/geniedislikescloud/" external className="underline">
                       it's easy to rack up costs.
                    </LinkTo> I turn projects off when I'm not developing them and only run a couple of small VMs / containers, one SQL DB at a time and there's network costs and taxes.
                     For the projects I'm planning, if I continue to host them on any cloud provider they will easily go into the hundreds of dollars per month.
                </Text>
                <Text p>
                    So I decided to build a local raspberry pi cluster, I was able to achieve all my goals and here's what I did to setup it up.
                </Text>
                <Seperator />
                <Text p subtitle>
                    Build a raspberry pi cluster
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/rasp_build_01.jpeg" alt="Raspberry Pi Cluster" size={ImageSize.SMALL} />

                <Text p>
                    I followed this youtube video to get it working: <LinkTo href="https://www.youtube.com/watch?v=X9fSMGkjtug" external className="underline">Youtube video</LinkTo>. 
                    I found some parts were out of date so below are the updated instructions.
                </Text>
                <Text p>
                    Here's a list of the hardware I used:
                </Text>
                <List type={ListType.disc} className="mt-5">
                    <li>4x Raspberry Pi 5 8GB</li>
                    <li>4x 64GB SD Cards</li>
                    <li>4x USB to USB C cables</li>
                    <li>1x fast charging hub (needs to be able to supply 5V 5A)</li>
                </List>
                <Text p subtitle>Raspberry Pi Initial Setup</Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/rpi-imager.webp" alt="Raspberry Pi SD setup" size={ImageSize.SMALL} />
                <Text p>
                    Before we install kubernetes we need to prepare each raspberry pi to be compatible with K3s (simplified kubernetes) 
                    and perform the following steps on each raspberry pi:
                </Text>
                <List type={ListType.disc} className="mt-5">
                    <List type={ListType.number} className="mt-5">
                        <li>Install raspberry pi imager from <LinkTo href="https://www.raspberrypi.com/software/" external className="underline">https://www.raspberrypi.com/software/</LinkTo></li>
                        <li>Using the imager flash a new SD card on your computer using the latest raspberry pi OS (64 bit). Set wifi, wifi password and ssh username / password.</li>
                        <li>Turn on the raspberry pi and wait for it to boot up.</li>
                        <Image src="/public/imp_assets/posts/kubernetes_cluster/local_network.png" alt="Raspberry Pi Booted up" size={ImageSize.SMALL} caption="I can now see the raspberry pi on my home router dashboard" />
                        <li>Find the pi on the local network and ssh into it, E.G.: <CodeBlock code ={"ssh 192.168.1.49" }></CodeBlock></li>
                        <Image src="/public/imp_assets/posts/kubernetes_cluster/ssh_cluster.png" alt="SSH into Raspberry Pi" size={ImageSize.MEDIUM} />
                        <li>On the pi, run: <CodeBlock code ={"sudo echo ' cgroup_memory=1 cgroup_enable=memory' >> /boot/firmware/cmdline.txt" }></CodeBlock>(This is needed for kubernetes to work)</li>
                        <li>On the pi, run: <CodeBlock code ={"sudo apt update && sudo apt install iptables"}></CodeBlock></li>
                        <li>Restart the raspberry pi</li>
                    </List>
                </List>
                <Text p>
                    Now it's time to install kubernetes, first we need to setup the main / master node which will control the cluster.
                </Text>
                <Text subtitle className="mt-10 md:text">
                    K3 installation
                </Text>
                <ol className="list-decimal ml-6">
                    <li>
                        Install K3 master node:
                        <ul className="list-disc ml-6">
                            <li>
                                SSH into the master node and run the following command:
                            </li>
                            <li>
                                <CodeBlock code={"curl -sfL https://get.k3s.io | K3S_NODE_NAME=rasp-kube-master sh -"}></CodeBlock>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Get master node token so other nodes can join the cluster with:
                        <ul className="list-disc ml-6">
                            <li>
                                SSH into the master node and run the following command:
                            </li>
                            <li>
                                <CodeBlock code={"sudo cat /var/lib/rancher/k3s/server/node-token"}></CodeBlock>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Install worker K3 nodes (for each worker change node name number):
                        <ul className="list-disc ml-6">
                            <li>
                                SSH into each worker node and run the following command:
                            </li>
                            <li>
                                <CodeBlock code={`
export MASTER_IP=<master-ip>
export MASTER_NODE_TOKEN=<master-node-token>
curl -sfL https://get.k3s.io | K3S_URL=https://$MASTER_IP:6443 K3S_TOKEN=<master-node-token> K3S_NODE_NAME=rasp-worker-01 sh -
                                `}></CodeBlock>
                            </li>
                        </ul>
                    </li>
                </ol>
                <Text p>
                    Your cluster should now be working, SSH into the master node and run the following command to confirm the nodes are live:
                </Text>
                <CodeBlock code={"kubectrl get nodes"}></CodeBlock>
                <Text p>
                    If you had issues with the cluster, here's the links to the k3s documentation: <LinkTo href="https://docs.k3s.io/quick-start" external className="underline">https://docs.k3s.io/quick-start</LinkTo>. 
                    Otherwise you should see something like this:
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/k3s_nodes.png" alt="K3s Nodes" size={ImageSize.SMALL} />
                <Text p>
                    You should now have a working kubernetes cluster!
                </Text>
                <Text p subtitle>Local Machine Setup</Text>
                <Text p>
                    Next we need to setup authentication for the computer to remove the need to ssh into the cluster. Here's the docs in case you get stuck: <LinkTo href="https://docs.k3s.io/cluster-access" external className="underline">https://docs.k3s.io/cluster-access</LinkTo>
                </Text>
                <ol className="list-decimal ml-6">
                    <li>Copy master kube config file <code>/etc/rancher/k3s/k3s.yaml</code> &rarr; local machine <code>~/.kube/config</code></li>
                    <li>Modify <code>~/.kube/config</code> on your local machine, update "server" value to master node IP</li>

                    <li>Confirm kubectl setup with <CodeBlock code={"kubectrl get nodes"}></CodeBlock></li>
                </ol>
                <Text p>
                    Now you can use kubectl to manage the cluster from your local machine.
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/rasp_build_02.jpeg" alt="Kubectl Nodes" size={ImageSize.SMALL} />
                <Text p subtitle>Secure HTTPS Access</Text>
                <Text p>
                    This was the main problem that stopped me in past, I have a dynamic IP and my ISP doesn't offer static IPs. I didn't want to expose my 
                    public IP or have to periodically change my DNS settings as my IP address changed. So I looked into exposing a local network service to the internet.
                </Text>
                <Text p subtitle>The fall of ngrok</Text>
                <Text p>
                    I originally tried using <LinkTo href="https://ngrok.com/" external className="underline">ngrok</LinkTo>, this 
                    is the gold standard for explosing services in a local network securely, I've used this previously for free. It has since fallen victim to the need to 
                    charge as much out of customers as possible. The free tier allows 2,000 requests a month (WTF?) or it cost me $68 per month for 1 endpoint!
                </Text>
                <Text p>
                    So I looked into other options.
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/inlets.png" alt="Inlets" size={ImageSize.XS} />
                <Text p subtitle>The rise Inlets</Text>
                <Text p>
                    <List type={ListType.disc}>
                        <li>
                            After trawling reddit <LinkTo href="https://www.reddit.com/r/selfhosted/" external className="underline">self hosted solutions</LinkTo>, I found <LinkTo href="https://inlets.dev/" external className="underline">Inlets</LinkTo>, a much cheaper alternative to ngrok.
                        </li>
                        <li>
                            Inlets costs $25 per month for the software.
                        </li>
                        <li>
                            The VMs it sets up cost about $10 per month.
                        </li>
                        <li>
                            I can have as many endpoints as I want for $35 per month.
                        </li>
                    </List>
                </Text>
                <Text p>
                    Inlets works by creating an ssh tunnel between a local service and a public VM, which is then exposed to the internet.
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/inlets_setup.png" alt="Inlets Setup" size={ImageSize.MEDIUM} />
                <Text p>
                    To get this working I had to get my credit card out to setup:
                    <ul className="list-disc ml-6">
                        <li>A <LinkTo href="https://www.digitalocean.com/" external className="underline">digital ocean</LinkTo> account.</li>
                        <li>An inlets license, which I think is well worth the $25 a month.</li>
                    </ul>
                    I was then able to generate a digitial ocean API key and save my inlets license to a file ($HOME/.inlets/LICENSE).
                    Then I just needed to run the following commands to install the inlets operator:
                </Text>
                <CodeBlock code={`
                    # Digitial Ocean API key
                    export ACCESS_TOKEN=$HOME/access-token

                    # Install arkade
                    curl -sSLf https://get.arkade.dev/ | sudo sh

                    arkade install inlets-operator \\
                    --provider digitalocean \\
                    --region lon1 \\    
                    --token-file $ACCESS_TOKEN \\
                    --license-file "$HOME/.inlets/LICENSE"
                `}></CodeBlock>
                <Text p>
                    This took a bit of time to complete as it needed to:
                    <List type={ListType.disc}>
                        <li>Install arkade cli</li>
                        <li>Create a VM on digital ocean</li>
                        <li>Install the inlets operator on your kubernetes cluster</li>
                    </List>
                    You should now have a public IP address to ping your cluser, here's a link to the docs: <LinkTo href="https://docs.inlets.dev/tutorial/kubernetes-ingress/#install-the-inlets-operator" external className="underline">https://docs.inlets.dev/tutorial/kubernetes-ingress/#install-the-inlets-operator</LinkTo>
                </Text>
                <Text p subtitle>Kubernetes Ingress + HTTPS Setup</Text>
                <Text p>
                    I think this post is getting a bit long so I'll wrap it up, now we have a public IP address to safely access the cluster, the rest of the process 
                    is standard kubernetes ingress + https setup. I used <LinkTo href="https://docs.inlets.dev/tutorial/kubernetes-ingress/#install-nginx-ingress" external className="underline">the Inlets guide</LinkTo> to 
                    install nginx ingress + cert manager and it worked great for me to access multiple services.
                </Text>
                <Text p>
                    Lastly I used AWS route 53 to point my domains to the public digital ocean IP address, and I quickly setup some great Kubernetes tools:
                </Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/route53.png" alt="Route 53 setup" size={ImageSize.MEDIUM} />
                <Text subtitle>The outcome</Text>
                <Text p>I can now spin up as many services as my raspberry pi cluster can handle, and I can access them from anywhere in the world with a secure HTTPS connection.
                    Here's a list of some great tools I installed to make managing the cluster easier:
                </Text>
                <List type={ListType.disc}>
                    <li>rancher - to manage the cluster</li>
                    <li>grafana - to visualize the data</li>
                    <li>prometheus - to monitor the cluster</li>
                </List>
                <Text p>Here's grafana in action accessible from my domain: https://rancher.jwnwilson.co.uk/ monitoring my cluster:</Text>
                <Image src="/public/imp_assets/posts/kubernetes_cluster/grafana.png" alt="Grafana" size={ImageSize.MEDIUM} />
                <Text p>I hope you enjoyed this post, if you have any questions or feedback please let me know.</Text>
                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/experiments/kubernetes-cluster",
                        identifier: "kubernetes-cluster",
                        title: "Self Hosting Kubernetes",
                    }
                }></DiscussionEmbed>
            </div>
        </PageLayout>
    )
}

export default Article;
